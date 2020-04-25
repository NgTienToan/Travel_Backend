const Room = require('../models/room')

const createRoom = async (req, res) => {
    try {
        const {fields,status,rentorID} = req.body;
        const newRoom = new Room({
            fields,
            status,
            rentorID
        })
        const room = await newRoom.save();
        if(newRoom){
            return res.status(200).json({
                success: true,
                message: 'Room is created successfully',
                data: {
                    room
                }
            }) 
        }
        
    } catch (error) {
        console.log(error);
    }
}
const bookRoom = async (req, res) => {
    try {
        const {roomID, rentorID} = req.body;
        if(!roomID && !rentorID){
            return res.status(400).json({
                success: false,
                message: 'RoomID or rentorID is required'
            })
        }
        let room = Room.findOneAndUpdate({_id: roomID}, {$set: {rentorID: rentorID, status: 'RENTED'}});
        if(room){
            return res.status(200).json({
                success: true,
                message: 'Room is booked successfully',
                data: {
                    room
                }
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}
const cancelRoom  = async (req, res) => {
    try {
        const {roomID} = req.body;
        if(!roomID){
            return res.status(400).json({
                success: false,
                message: 'RoomID is required'
            })
        }
        let room = Room.findOneAndUpdate({_id: roomID}, {$set: {rentorID: "", status: 'EMPTY'}});
        if(room){
            return res.status(200).json({
                success: true,
                message: 'Room is booked successfully',
                data: {
                    room
                }
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllRoomEmpty = async (req, res) => {
    try {
        const rooms = await Room.find({status: 'EMPTY'});
        if(!rooms) {
            return res.status(400).json({
                success: false,
                message: 'get room fail'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'get room successfully',
                data: {
                    rooms
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getRoomById = async (req, res) => {
    try {
        let {roomID} = req.params;
        
        if(!roomID) {
            return res.status(400).json({
                success: false,
                message: 'RoomID is required'
            })
        }
        const room = await Room.findOne({_id: roomID});
        if(!room) {
            return res.status(400).json({
                success: false,
                message: 'get room fail'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'get room successfully',
                data: {
                    room
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    createRoom,
    getRoomById,
    bookRoom,
    cancelRoom,
    getAllRoomEmpty
}