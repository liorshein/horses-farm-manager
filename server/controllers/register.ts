import { RequestHandler } from "express";
import { client } from "../db"

export const signUp: RequestHandler = async (req, res) => {
    console.log(req.body);
    res.send({ success: true });
}

// export const addLocation: RequestHandler = async (req, res) => {
//     const queryResult = await client.query(
//         `INSERT INTO locations(lat, lon, base_name, nearest_city) VALUES ($1, $2, $3, $4) RETURNING location_id`, [
//         req.body.lat,
//         req.body.lon,
//         req.body.base_name,
//         req.body.nearest_city
//     ]);
//     res.send({location_id: queryResult.rows[0].location_id});
// }

// export const removeLocation: RequestHandler = async (req, res) => {
//     const locationReqId = req.query.location_id
//     await client.query(`DELETE FROM locations WHERE locations.location_id = $1`, [locationReqId]);
//     res.send({ success: true });
// }

// export const updateLocation: RequestHandler = async (req, res) => {
//     const locationReqId = req.query.location_id
//     console.log(req.body);

//     await client.query(
//         `UPDATE locations
//         SET location_id = $1, lat = $2, lon = $3, base_name = $4, nearest_city = $5
//         WHERE locations.location_id = $1`, [locationReqId, req.body.lat, req.body.lon, req.body.base_name, req.body.nearest_city]);
//     res.send({ success: true });
// }