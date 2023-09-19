import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBEmXOEMUZ4nMAabh328dZQVsbES-XR20g",
    authDomain: "proyecto-backfront-a70ce.firebaseapp.com",
    projectId: "proyecto-backfront-a70ce",
    storageBucket: "proyecto-backfront-a70ce.appspot.com",
    messagingSenderId: "231438685747",
    appId: "1:231438685747:web:b782a887af692be31af546"
  };

  const firebase = initializeApp(firebaseConfig)
  const db = getFirestore(firebase)

  // Settings App
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
    try {
        const Users = await collection(db, 'Users')
        const listUsers = await getDocs(Users)
        const aux = []
        listUsers.forEach((doc) => {
            const obj = {
            id: doc.id,
            ...doc.data()
        }
        aux.push(obj)
    })
        res.send({
            'msg': 'success',
            'data': aux
        })
    } catch(error) {
        res.send({
            'msg': 'error',
            'data': error
        })  
    }
})

app.post('/create', async(req, res) => {
    try{
        const body = req.body;
        const Users = await collection(db, 'Users');
        await addDoc(Users, body);
        res.send({
            'msg': 'success'
        })
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': 'error'
        })
    }

})

app.get('/get-update/:id', async (req, res) => {
    const id = req.params.id;

    const userRef = doc(db, 'Users',id);
    const user = await getDoc(userRef);
    //console.log(user.exists());

    if (user.exists()){
        res.send({
            'msg': 'success',
            'data': user.data()
        })
    }
    else {
        res.send({
            'msg': 'user doent exist'
        })
    }
})

app.post('/update', async (req, res) => {
    const {id, firstname, lastname, address, city, phone, zipcode} = req.body;
    const newData = {
        firstname,
        lastname,
        address,
        city,
        phone,
        zipcode
    }

    try {
        await updateDoc(doc(db, "Users", id), newData)
    res.send({
        'msg': 'success'
    })
    } catch (error) {
        console.log(error)
    }
    
    console.log("@@@ body => ", req.body);
})

app.get('/delete/:id', async (req, res) => {
    //console.log('@@@ param => ', req.params.id);
    const id = req.params.id;
    try{
        await deleteDoc(doc(db, 'Users', id));
        res.send({
            'msg': 'user deleted'
        })
    }
    catch (error){
        res.send({
            'msg': 'error',
            'data': 'error'
        })
    }
});

// Run Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});