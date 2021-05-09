import { AXIOS } from "./server"

export default {
    DataKota() {
        return AXIOS.get('api/daerahindonesia/kota?id_provinsi=32');
    }
}