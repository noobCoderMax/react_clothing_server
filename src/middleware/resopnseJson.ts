const responseJson = (success: boolean, message: string, data?: any) => {
  if (data) {
    return {
      success,
      message,
      data
    }
  } else {
    return {
      success,
      message,
      data:null
    }
  }
 
}
export default responseJson