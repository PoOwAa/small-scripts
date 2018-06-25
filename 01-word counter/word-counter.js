/**
 * Simple function which count the words in a text file
 *
 * @param {*} fileList
 */
function wordCounter(fileList) {
    // Checking if a file is chosen or not
    if (fileList.length > 0) {
        const myFile = fileList[0];
        console.log(`${myFile.name} just loaded! Size: ${myFile.size}`);

        // Creating a fileReader
        const reader = new FileReader();
        // Read the input file
        reader.readAsText(myFile);
        // Catching the file data
        reader.onload = () => {
            const text = reader.result;
            console.log(`Text: ${text}`);
            // Storing the word count here
            const counter = {};
            // Getting rid of new lines and unnecessary whitespaces
            const formattedData = text
              .split("\n")
              .join(" ")
              .split("/\s/")
              .join(" ")
              .split(" ");

            // Counting the words
            formattedData.forEach( (word) => {
                if (counter[word] === undefined) {
                    counter[word] = 1;
                } else {
                    counter[word]++;
                }
            });

            // Writing the result to the console.
            console.log(counter);
        };
    }
}