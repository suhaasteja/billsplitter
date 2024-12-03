from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_session import Session
import os
from config import Config
from verify_api import process_image_with_veryfi_api

app = Flask(__name__, static_folder='static', template_folder='templates')

# Configure server-side sessions
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
Session(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'bill_image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    image = request.files['bill_image']
    if image.filename == '':
        return jsonify({'error': 'No selected file.'}), 400

    # Save image temporarily
    temp_dir = os.path.join(os.getcwd(), 'uploads')
    os.makedirs(temp_dir, exist_ok=True)
    image_path = os.path.join(temp_dir, image.filename)
    image.save(image_path)

    try:
        # Process the image with Veryfi API
        veryfi_response = process_image_with_veryfi_api(image_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(image_path)

    # Extract items and store them in the session
    items = []
    if 'line_items' in veryfi_response:
        for item in veryfi_response['line_items']:
            total = item.get('total')
            if total and total > 0:
                description = item.get('description') or item.get('text') or 'Unknown Item'
                items.append({'name': description, 'price': total})

    session['items'] = items
    session['people'] = []
    session['allocations'] = []
    session['totals'] = {}
    session.modified = True

    return redirect(url_for('session_view'))

@app.route('/session', methods=['GET', 'POST'])
def session_view():
    items = session.get('items', [])
    people = session.get('people', [])
    return render_template('session.html', items=items, people=people)

@app.route('/add_person', methods=['POST'])
def add_person():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({'error': 'Name is required.'}), 400

    if name not in session['people']:
        session['people'].append(name)
        session.modified = True
        return jsonify({'message': 'Person added successfully.', 'people': session['people']}), 201
    else:
        return jsonify({'message': 'Person already exists.', 'people': session['people']}), 200

@app.route('/finalize', methods=['POST'])
def finalize_split():
    data = request.get_json()
    allocations = data.get('allocations', {})

    items = session.get('items', [])
    people = session.get('people', [])

    if not allocations:
        return jsonify({'error': 'No allocations provided.'}), 400

    # Initialize totals
    totals = {person: 0 for person in people}

    # Calculate split
    for item_name, shared_by in allocations.items():
        item = next((item for item in items if item['name'] == item_name), None)
        if item and shared_by:
            split_amount = item['price'] / len(shared_by)
            for person in shared_by:
                totals[person] += split_amount

    session['totals'] = totals
    session.modified = True

    return jsonify({'message': 'Split finalized.', 'totals': totals})

@app.route('/summary')
def summary():
    totals = session.get('totals', {})
    return render_template('summary.html', totals=totals)

if __name__ == '__main__':
    app.run(debug=True)