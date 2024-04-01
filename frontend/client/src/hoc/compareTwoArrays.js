function compareTwoArrays(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
        return false;
    }

    // Iterate over each element and compare them
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false; // Return false if any elements are different
        }
    }

    // If all elements are the same, return true
    return true;
}

export default compareTwoArrays;