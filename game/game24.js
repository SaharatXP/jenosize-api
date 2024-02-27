function playGame24(app) {
  app.post("/api/game24", (req, res) => {
    const numbers = req.body.numbers;
    if (
      !numbers ||
      numbers.length !== 4 ||
      !numbers.every((n) => n >= 1 && n <= 9)
    ) {
      return res.status(400).send({
        error: "Please provide exactly 4 numbers, each between 1 and 9.",
      });
    }

    const result = findSolution(numbers) ? "YES" : "NO";
    res.send({ result });
  });

  function findSolution(numbers) {
    // Define mathematical operations
    const ops = [
      (a, b) => a + b,
      (a, b) => a - b,
      (a, b) => a * b,
      (a, b) => (b !== 0 ? a / b : NaN),
    ];
    // Function to explore all combinations of numbers and operations
    function search(values) {
      if (values.length === 1) {
        if (Math.abs(values[0] - 24) < 1e-6) {
          return true; // Found a solution close to 24
        }
      }

      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
          if (i !== j) {
            for (let k = 0; k < ops.length; k++) {
              if ((k < 2 && i < j) || k >= 2) {
                const nextValues = values.filter(
                  (_, index) => index !== i && index !== j
                );
                const result = ops[k](values[i], values[j]);
                if (!isNaN(result)) {
                  nextValues.push(result);
                  if (search(nextValues)) {
                    return true;
                  }
                  nextValues.pop();
                }
              }
            }
          }
        }
      }
      return false;
    }

    return search(numbers);
  }
}

module.exports = playGame24;
