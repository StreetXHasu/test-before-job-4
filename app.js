const allowCur = ['Доллар США', 'Евро', 'Шведских крон', 'Японских иен', 'Канадский доллар']


function step1() {
    fetch('loadXML.php')
        .then((response) => {
            return response;
        })
        .then((data) => {
            console.log('ДАТА ', data);
            step2()
        });
}

function step2() {
    // 1. Создаём новый XMLHttpRequest-объект
    let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL /article/.../load
    xhr.open('GET', "Currency.xml");

// 3. Отсылаем запрос
    xhr.send();

// 4. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function () {
        if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
            console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            // console.log(xhr.responseXML.firstElementChild.children)
            let data = xhr.responseXML.firstElementChild.childNodes
            const filteredByValue = Object.fromEntries(
                Object.entries(data).filter(([, value]) => {
                    // console.log('123123 ',Array.from(value.children)[3]?.innerHTML)
                    if (allowCur.includes(Array.from(value.children)[3]?.innerHTML)) {
                        return value;
                    }
                    allowCur.includes(value.children)
                }))
            // console.log('filteredByValue', filteredByValue)

            Object.entries(filteredByValue).forEach(value => {
                // console.log(Array.from(value[1].children)[2]?.innerHTML)
                const CharCode = Array.from(value[1].children)[1]?.innerHTML
                const Nominal = Array.from(value[1].children)[2]?.innerHTML
                const Name = Array.from(value[1].children)[3]?.innerHTML
                const Value = Array.from(value[1].children)[4]?.innerHTML
                addItem(Nominal, CharCode, Name, Value)

            });

        }
    };


    xhr.onerror = function () {
        alert("Запрос не удался");
    };
}

document.addEventListener('DOMContentLoaded', function () {

    step1()
});

//О ужас, но да, не реакт вам.
function addItem(nominal, code, title, sum) {
    document.getElementById('box-second').innerHTML +=
        "<div class=\"box\">\n" +
        "        <div class=\"line\">\n" +
        "            <div class=\"value\">\n" +
        "                " + nominal + " " + code + " = " + sum + " RUB\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"value small2\">\n" +
        "            " + title + "\n" +
        "        </div>\n" +
        "    </div>"
}

function refresh() {
    document.getElementById('box-second').innerHTML = ""
    step1()
}