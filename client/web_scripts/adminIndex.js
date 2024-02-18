async function addDormitory() {
    const name = document.getElementById('dorm_name').value;
    const dorm_number = document.getElementById('dormNumber').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('http://localhost:9999/api/dormitory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, dorm_number: dorm_number, address }),
        });

        if (response.ok) {
            alert('Гуртожиток успішно додано!');
            document.getElementById('addDormitoryForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка при відправці запиту:', error);
    }
}

async function addStudent() {
    try {
        const surname = document.getElementById('surname').value;
        console.log(surname);
        const name = document.getElementById('name').value;
        const dormitory_num = document.getElementById('dormitory_num').value;
        const room_name = document.getElementById('room_name').value;
        console.log(room_name);
        const contact_info = document.getElementById('contact_info').value;

        const room = await fetch('localhost:9999/api/room/get-by-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_name
            }),
        });

        console.log("start");
        console.log(room);
        console.log("end");

        const response = await fetch('http://localhost:9999/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                surname,
                name,
                dormitory_num,
                roomId,
                contact_info,
            }),
        });

        if (response.ok) {
            alert('Студент успішно додано!');
            // Очистка полів форми
            document.getElementById('addStudentForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }

    } catch (error) {
        console.error('Помилка при додаванні студента:', error);
        alert('Помилка при додаванні студента:', error);
    }
}

async function addRoom() {
    try {
        const block_number = document.getElementById('block_number').value;
        const capacity = document.getElementById('capacity').value;
        const free_capacity = document.getElementById('free_capacity').value;
        const room_name = document.getElementById('room_name').value;
        const dormitoryId = document.getElementById('dormitoryId').value;

        const response = await fetch('http://localhost:9999/api/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                block_number,
                capacity,
                free_capacity,
                room_name,
                dormitoryId,
            }),
        });

        if (response.ok) {
            alert('Кімнату успішно додано!');
            document.getElementById('addRoomForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }

    } catch (error) {
        console.error('Помилка при додаванні кімнати:', error);
        alert('Помилка при додаванні кімнати:', error);
    }
}
