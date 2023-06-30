//Function to generate a new ID
export function generateId(arr) {
  if (arr.length === 0) {
    return 1;
  } else {
    const lastTodo = arr[arr.length - 1];
    return lastTodo.id + 1;
  }
}
