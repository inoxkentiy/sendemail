let firstRowBlock = $("#row1")
let secondRowBlock = $("#row2")
let thirdRowBlock = $("#row3")
let fourthRowBlock = $("#row4")
let input = $("#input")
let capsLocked = false

function drawDuttons() {
    let keyboardButtons = {
        firstRow: [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BACKSPACE'
        ],
        secondRow: [
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'
        ],
        thirdRow: [
            'CAPSLOCK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ],
        fourthRow: [
            'SPACE', 'SEND'
        ]
    }

    // let rowButtons = $(".row")
    // let rowCount = 0

    // for(let rowButtons in keyboardButtons){
    //     let buttons = keyboardButtons[rowButtons]

    // }




    firstRowBlock.empty()

    keyboardButtons.firstRow.map(item => {
        firstRowBlock.append(`
        <div class="letterButton">
            ${capsLocked ? item.toUpperCase() : item.toLowerCase()}
        </div>
        `)
    })


    secondRowBlock.empty()

    keyboardButtons.secondRow.map(item => {
        secondRowBlock.append(`
        <div class="letterButton">
            ${capsLocked ? item.toUpperCase() : item.toLowerCase()}
        </div>
        `)
    })


    thirdRowBlock.empty()

    keyboardButtons.thirdRow.map(item => {
        if (item === 'CAPSLOCK' && capsLocked) {
            thirdRowBlock.append(`
        <div class="letterButton active">
            ${item}
        </div>
        `)
        } else {
            thirdRowBlock.append(`
            <div class="letterButton">
                ${capsLocked ? item.toUpperCase() : item.toLowerCase()}
            </div>
            `)
        }

    })


    fourthRowBlock.empty()

    keyboardButtons.fourthRow.map(item => {
        fourthRowBlock.append(`
        <div class="letterButton">
            ${item}
        </div>
        `)
    })

    let allbuttons = document.querySelectorAll(".letterButton")

    for (let i = 0; i < allbuttons.length; i++) {
        allbuttons[i].addEventListener('click', (event) => {
            let buttonText = event.currentTarget.innerText;
            console.log(buttonText)
            switch (buttonText) {
                case 'BACKSPACE':
                    let newText = input.val().slice(0, -1);
                    input.val(newText);
                    break;
                case 'capslock':
                case 'CAPSLOCK':
                    capsLocked = !capsLocked;
                    drawDuttons()
                    break;
                case 'space':
                case 'SPACE':
                    input.val(input.val() + ' ')
                    break;
                case 'enter':
                case 'ENTER':
                    input.val(input.val() + '\n')
                    break;
                case 'send':
                case 'SEND':
                    function sendEmail() {

                        let templateParams = {
                            from_name: 'проверка',
                            to_email: 'reallibi@gmail.com',
                            message: input.val()
                        };

                        emailjs.send('service_fjt3gqc', 'template_d5z3o6i', templateParams)
                            .then(function (response) {
                                console.log('SUCCESS!', response.status, response.text);
                            }, function (error) {
                                console.log('FAILED...', error);
                            });
                    }
                    sendEmail();
                    break;
                default:
                    input.val(input.val() + buttonText)
            }
        })
    }
}
drawDuttons()

