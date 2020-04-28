const Room = require('../models/room');
const auth = require('../middlewares/authentication')

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
        const rentorID = req.user.userID;
        const {roomID, checkInDate, checkOutDate} = req.body;
        if(!roomID && !rentorID){
            return res.status(400).json({
                success: false,
                message: 'RoomID or rentorID is required'
            })
        }
        let room = await Room.findOneAndUpdate({_id: roomID}, {rentorID: rentorID, checkInDate: checkInDate, checkOutDate: checkOutDate, status: 'RENTED'});
        if(room){
            return res.status(200).json({
                success: true,
                message: 'Đặt Phòng Thành Công',
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
        const {userID} = req.user;
        const {roomID} = req.body;
        if(!roomID){
            return res.status(400).json({
                success: false,
                message: 'RoomID is required'
            })
        }
        let temp = await Room.findOne({_id: roomID});
        if(userID != temp.rentorID) {
            return res.status(400).json({
                success: false,
                message: 'you can not cancel this room'
            })
        }

        let room = await Room.findOneAndUpdate({_id: roomID}, {rentorID: "", checkInDate: "", checkOutDate: "", status: 'EMPTY'});
        if(room){
            return res.status(200).json({
                success: true,
                message: 'Hủy Đặt Phòng Thành Công',
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

const getBookingRoom = async (req, res) => {
    const {userID} = req.user;
    let rooms = await Room.find({rentorID: userID});
    if(rooms){
        return res.json({
            success: true,
            message: 'success',
            data: rooms
        })
    }
}

module.exports={
    createRoom,
    getRoomById,
    bookRoom,
    cancelRoom,
    getAllRoomEmpty,
    getBookingRoom
}