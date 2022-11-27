'use strict'
const
    gameSetting = {
        maxRounds: 5,
        currentRound: 1,
        userCount: 0,
        computerCount: 0

    },
    gameWinningOptions = [
        {
            name: 'scissors',
            beats: 'paper'
        },
        {
            name: 'paper',
            beats: 'rock'
        },
        {
            name: 'rock',
            beats: 'scissors'
        }
    ],
    options = ['rock', 'paper', 'scissors'];

/**
 * logs the current round number to the console.
 */
const displayNewRound = () => {
    console.log("%c" + `---------- Round Nr. ${gameSetting.currentRound} / ${gameSetting.maxRounds} ----------`, "color: white; font-size: 24px; font-weight: bold;")
}

/**
 * increases the currentRound counter within the game-settings.
 */
const increaseRound = () => {
    gameSetting.currentRound++
}

/**
 * generates a random number within the parameter range and returns a selection based on the index of the random number within the options.
 * @return {string} as string
 */
const computerChoiceGenerator = (range) => {
    const randomIndex = Math.floor(Math.random() * range);
    return options[randomIndex]
}

/**
 * takes in UserImput from prompt and checks if the lowercase version of that string is valid by the possible options. 
 * Returns a boolean, depending on the validity.
 * @param {string} userInput as string
 * @return {boolean} as boolean
 */
const evaluateInput = (userInput) => {
    let validatedUserChoice = "";
    for (let option of options) {
        if (userInput.toLowerCase() === option) {
            validatedUserChoice = option
            return true
        }
    }
    if (validatedUserChoice === "") {
        // console.log("%c" + "Your choice is not valid, please try again!", "color: white; font-size: 24px; font-weight: bold;")
        return false
    } else {
        return true
    }
}

/**
 * This function takes in both user and computer choices and evaluates & logs, who won this round, plus increasing the correct counter!
 * @param {string} userChoice
 * @param {String} computerChoice
 */
const evaluateRoundWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        console.log("%c" + `Your choice: '${userChoice}' vs. Computer choice: '${computerChoice}'`, "color: white; font-size: 24px; font-weight: bold;");
        console.log("%c" + "Draw! No points for both!", "color: yellow; font-size: 24px; font-weight: bold;")
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
        userChoice = prompt("Draw: Please insert your choice again: Scissors / Stone / Paper")
        computerChoice = computerChoiceGenerator(options.length)
        evaluateRoundWinner(userChoice, computerChoice)
    } else {
        for (let option of gameWinningOptions) {
            if (option.name === userChoice && option.beats === computerChoice) {
                console.log("%c" + `Your choice: '${userChoice}' vs. Computer choice: '${computerChoice}'`, "color: white; font-size: 24px; font-weight: bold;");
                console.log("%c" + "You won this round!", "color: green; font-size: 24px; font-weight: bold;")
                console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
                gameSetting.userCount++
            } else if (option.name === computerChoice && option.beats === userChoice) {
                console.log("%c" + `Your choice: '${userChoice}' vs. Computer choice: '${computerChoice}'`, "color: white; font-size: 24px; font-weight: bold;");
                console.log("%c" + "Computer won this round!", "color: orange; font-size: 24px; font-weight: bold;")
                console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
                gameSetting.computerCount++
            }
        }
    }
}

/**
 * compares the final counters and logs the winner!
 */
const evaluateGameWinner = () => {
    if (gameSetting.userCount > gameSetting.computerCount) {
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
        console.log("%c" + "Horray, You won this game!", "color: green; font-size: 24px; font-weight: bold;")
        console.log("%c" + `Overview: Your Points: ${gameSetting.userCount} vs. Computer Points: ${gameSetting.computerCount}`, "color: white; font-size: 24px; font-weight: bold;")
    } else {
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
        console.log("%c" + "Oh no, You did not win this game!", "color: red; font-size: 24px; font-weight: bold;")
        console.log("%c" + `Overview: Computer Points: ${gameSetting.computerCount} vs. Your Points: ${gameSetting.userCount}`, "color: white; font-size: 24px; font-weight: bold;")
    }
}

/**
 * This function gets user choice via Prompt, validates the answer and returns it as lowercase answer
 * @return {String} 
 */
const getUserChoice = () => {
    let userChoice = prompt("Please insert your choice: Scissors / Stone / Paper")
    if (userChoice === null) {
        console.log("%c" + "It smells weak in here! To quit is not an option!", "color: white; font-size: 24px; font-weight: bold;")
        getUserChoice()
    } else {
        while (!evaluateInput(userChoice)) {
            console.log("%c" + `This choice of '${userChoice}' not valid, please try again!`, "color: white; font-size: 24px; font-weight: bold;")
            userChoice = prompt("Please insert your choice: Scissors / Stone / Paper")
        }
        return userChoice.toLowerCase()
    }
}

/**
 * sends a confirm to the browser, which either restarts the game or says goodbye to the user
 *
 */
const restartGame = () => {
    const shouldRestart = confirm("Would you like to play again?")
    if (shouldRestart) {
        gameSetting.computerCount = 0
        gameSetting.computerCount = 0
        gameSetting.currentRound = 1
        console.clear()
        startGame()
    } else {
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
        console.log("%c" + "Thank you for playing and have a lovely day!", "color: white; font-size: 24px; font-weight: bold;");
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
    }
}

/**
 * Contains the whole flow of the game incl. Start and possible restart!
 */
const startGame = () => {
    new Promise((resolve, reject) => {
        console.log("%c" + "Hello and welcome to a game of 'Rock, Paper Scissors'!", "color: white; font-size: 24px; font-weight: bold;");
        console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
        setTimeout(() => {
            const shouldStart = confirm("Would you like to start playing?")
            if (shouldStart) {
                console.log("%c" + "This game will go over five round! May the luck be on your Side!", "color: white; font-size: 24px; font-weight: bold;");
                resolve()
            } else {
                console.log("%c" + "Sad, that you don't want to play, but still have a lovely day!", "color: white; font-size: 24px; font-weight: bold;");
                console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
            }
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            console.log("%c" + "Please note that only 'Rock, Paper Scissors' are accepted as answers!", "color: white; font-size: 24px; font-weight: bold;");
            console.log("%c" + "------------------------------------------------", "color: white; font-size: 24px; font-weight: bold;")
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            displayNewRound()
            evaluateRoundWinner(getUserChoice(), computerChoiceGenerator(options.length))
            increaseRound()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            displayNewRound()
            evaluateRoundWinner(getUserChoice(), computerChoiceGenerator(options.length))
            increaseRound()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            displayNewRound()
            evaluateRoundWinner(getUserChoice(), computerChoiceGenerator(options.length))
            increaseRound()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            displayNewRound()
            evaluateRoundWinner(getUserChoice(), computerChoiceGenerator(options.length))
            increaseRound()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            displayNewRound()
            evaluateRoundWinner(getUserChoice(), computerChoiceGenerator(options.length))
            increaseRound()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            evaluateGameWinner()
            return
        }, 1000);
    }).then(() => {
        setTimeout(() => {
            restartGame()
            return
        }, 2000);
    })
}

startGame()