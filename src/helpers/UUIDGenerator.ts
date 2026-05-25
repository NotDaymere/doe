export function generateUUID() {
  const timestamp = new Date().getTime();  // Get the current timestamp
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);

}) + '-' + timestamp.toString(16);  // Append the timestamp as a hexadecimal string
}