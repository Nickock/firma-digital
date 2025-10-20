export default function apiResponse(sucess: boolean, payload: object) {
  return { sucess: sucess, payload: payload }
}
