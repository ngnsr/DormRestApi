const { Room } = require('../db/models');
const ApiError = require('../error/ApiError');

class RoomController {

    async create(req, res, next) {
        try {
            const { block_number, capacity, free_capacity, dormitoryId } = req.body;
            const room_name = block_number + "/" + capacity;
            const room = await Room.create({ block_number, capacity, free_capacity, room_name, dormitoryId });
            return res.json(room);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const rooms = await Room.findAll();
        return res.json(rooms);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        return res.json(room);
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { block_number, capacity, free_capacity, room_name } = req.body;

            if(capacity < free_capacity){
                return next(ApiError.badRequest('Загальна кількість місць кімнати не може бути менша за кількість вільних місць'))
            }

            if(free_capacity > capacity){
                return next(ApiError.badRequest('Кількість вільних місць кімнати не може бути більша за загальну кількість місць'))
            }

            const room = await Room.findByPk(id);

            if (!room) {
                return next(ApiError.badRequest('Кімнату не знайдено'));
            }

            await room.update({block_number, capacity, free_capacity, room_name});

            return res.json(room);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getIdByName(req, res, next) {
        const { room_name } = req.body;
        console.log(req.body);
        const room = await Room.findOne({where:{room_name}});
        return res.json(room);
    }
}

module.exports = new RoomController();
