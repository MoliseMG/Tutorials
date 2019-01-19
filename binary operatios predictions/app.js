var tf = require('@tensorflow/tfjs')

const model = tf.sequential();

const hidenLayer1 = tf.layers.dense(
    {
        inputShape : [4],
        units : 4,
        activation : 'sigmoid',
    }
);

const hidenLayer2 = tf.layers.dense(
    {
        units : 4,
        activation : 'sigmoid',
    }
);

const outputLayer = tf.layers.dense(
    {
        units : 1,
        activation : 'sigmoid',
    }
)

model.add(hidenLayer1)
model.add(hidenLayer2)
model.add(outputLayer)

model.compile(
    {
        loss : 'meanSquaredError',
        optimizer : 'sgd',
        lr :0.1
    }
)

console.log('Model build successfully...');


const xs = tf.tensor2d(
    [
        [1,1,1,1],
        [1,1,1,0],
        [1,1,0,1],
        [1,1,0,0],
        [1,0,1,1],
        [1,0,1,0],
        [1,0,0,1],
        [1,0,0,0],
        [0,0,0,1],
        [0,0,0,0]
    ]
);

const ys = tf.tensor2d(
    [
        [1],
        [1],
        [0],
        [1],
        [0],
        [1],
        [0],
        [1],
        [0],
        [0],
    ]
)

train().then(() => {
    console.log('training complete...');
    output = model.predict(tf.tensor2d([1,1,0,1], [1,4]))

    console.log('prediction : ', output)
})

async function train() {
   for(i = 1; i<=400; i++){
        await model.fit(xs,ys,{epochs : 500, shuffle : true})
        .then((resp)=>{
            console.log(i+' cycles : '+i*500+' loss : ',resp.history.loss[0] );
        })
    }

    /*await model.save('localstorage://temp/binaryoperations-1')
        .then(()=>{
            console.log('file saved to localstorage...');  
        })
        .catch((e) => {
            console.log('Saving failed '+e); 
        })*/
}