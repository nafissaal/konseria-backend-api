import os
from flask import Flask, jsonify, request, render_template
import requests
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
app = Flask(__name__)
import os

current_directory = os.getcwd()
print("Current project directory:", current_directory)

# GET /concerts - Get all concerts
@app.route('/topEvents', methods=['GET'])
def get_topevents():
    # inisialisasi
    top_events=[];

    url = 'https://konseria-389710.et.r.appspot.com/konseria/concerts'
    # print (url)
    # Make a GET request to fetch the data
    response = requests.get(url)
    # print (response)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Retrieve the data from the response
        data = response.json()
        # print(data['values'])
        df = pd.DataFrame.from_dict(data['data'])

    # Process and work with the data as needed
        df= df.sort_values("rate",ascending=False)
        event_ids = df['name'].unique()
        rating_ids=df['rate'].unique()
        id_map={id: i for i, id in enumerate(event_ids)}
        rating_map={id: i for i, id in enumerate(rating_ids)}
        df['event_index'] = df['name'].map(id_map)
        df['rating_index']=df['rate'].map(rating_map)
        X = df[['event_index','rating_index']].values
        y = df['rate'].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = tf.keras.Sequential([tf.keras.layers.Embedding(len(event_ids), 128, input_length=2),
            # tf.keras.layers.Dense(64),
            # tf.keras.layers.Dense(32),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(100, activation='relu'),
            tf.keras.layers.Dense(10),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(len(event_ids),activation='relu')

        ])
    # model.evaluate(x_test, y_test)
        model.compile(loss='mean_squared_error', optimizer=tf.keras.optimizers.Adam(learning_rate=0.1), metrics=["mse"])
        # predictions = model.predict(x_test)
        model.fit(X_train, y_train, epochs=100, batch_size=32, verbose=1)
        predictions = model.predict(X_test)
        sorted_indices = predictions.argsort(axis=0)[::-1].flatten()
        count_dict = {}
        for num in sorted_indices:
            if num in count_dict:
                count_dict[num] += 1
            else:
                count_dict[num] = 1
        # for num, count in count_dict.items():
        #     event=df.iloc[num,1]
        #     rating=df.iloc[num,14]
            # print("Angka", num, "muncul sebanyak", count, "kali.",",Event: ",event,",Ratingt: ",rating)
        top_event = event_ids[sorted_indices]
        top_events = list(dict.fromkeys(top_event))
        # print(top_events)
    #     # Example: Print the retrieved data
        # print(df)
    else:
        # Request was not successful, handle the error
        print("Error: Failed to retrieve data from the API")
    return jsonify(top_events[:5])
@app.route('/vip', methods=['GET'])
def get_vip():
     # Initialization

    url = 'https://konseria-389710.et.r.appspot.com/konseria/tickets/vip'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame.from_dict(data['data'])
        i = int(request.args.get('i')) #code id
        event_names = []    
        std = df.iloc[i]['quantity']
        sisa_std = df.iloc[i]['avalilableQuantity']
        print(std-sisa_std)
        total_jual=std - sisa_std
        event_names=df.iloc[i]['event_name']
        labels = ['Tiket VIP yang tersedia', 'Total Jual']

        # Create the pie chart
        plt.figure()
        plt.pie([std, total_jual], labels=labels, autopct='%1.1f%%')
        plt.title(f'Comparison for {event_names}')

        # Get the path relative to the current working directory
        current_dir = os.getcwd()
        # Create the 'static' directory if it doesn't exist
        if not os.path.exists('static'):
            os.makedirs('static')
        plot_path = os.path.join(current_dir,"static", f'vip{i}.png')

        # Save the plot as an image
        plt.savefig(plot_path)

        # Render the HTML template with the plot image
        return render_template('vip.html', plot_path=""f'static/vip{i}.png')

    else:
        print("Error: Failed to retrieve data from the API")
        return jsonify([])

@app.route('/standard', methods=['GET'])
def get_standard():
     # Initialization

    url = 'https://konseria-389710.et.r.appspot.com/konseria/tickets/standard'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame.from_dict(data['data'])
        i = int(request.args.get('i')) #code id   
        std = df.iloc[i]['quantity']
        sisa_std = df.iloc[i]['avalilableQuantity']
        print(std-sisa_std)
        total_jual=std - sisa_std
        event_names=df.iloc[i]['event_name']
        labels = ['Tiket Standard yang tersedia', 'Total Jual']

        # Create the pie chart
        plt.figure()
        plt.pie([std, total_jual], labels=labels, autopct='%1.1f%%')
        plt.title(f'Comparison for {event_names}')

        # Get the path relative to the current working directory
        current_dir = os.getcwd()
        # Create the 'static' directory if it doesn't exist
        if not os.path.exists('static'):
            os.makedirs('static')
        plot_path = os.path.join(current_dir,"static", f'standard{i}.png')

        # Save the plot as an image
        plt.savefig(plot_path)

        # Render the HTML template with the plot image
        return render_template('vip.html', plot_path=""f'static/standard{i}.png')

    else:
        print("Error: Failed to retrieve data from the API")
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
