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
        const name = document.getElementById('name').value;
        const dorm_number = document.getElementById('dorm_number').value;
        const room_name = document.getElementById('room_name').value;
        const contact_info = document.getElementById('contact_info').value;
        
        const roomResp = await fetch('http://localhost:9999/api/room/get-by-dorm-num-and-name/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_name,
                dorm_number
            }),
        });
        
        if(!roomResp.ok){
            room_name.value = '';
            dorm_number.value = '';
            alert("Такої кімнати або гуртожитку не існує!")
            return;
        }

        const room = await roomResp.json();
        const roomId = room.id;

        const response = await fetch('http://localhost:9999/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                surname,
                name,
                dormitory_num: dorm_number,
                roomId,
                contact_info,
            }),
        });

        if (response.ok) {
            alert('Студент успішно додано!');
            document.getElementById('addStudentForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка при додаванні студента:', error.message);
        alert('Помилка при додаванні студента:', error.message);
    }
}

async function addRoom() {
    try {
        const block_number = document.getElementById('block_number').value;
        const capacity = document.getElementById('capacity').value;
        const free_capacity = capacity;
        const room_name = block_number + "/" + capacity;
        const dorm_number = document.getElementById('room_dorm_number').value;

        const dormResp = await fetch('http://localhost:9999/api/dormitory/get-by-dorm-num', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dorm_number
            }),
        });

        if(!dormResp.ok){
            dorm_number.value = '';
            alert("Такого гуртожитку не існує!")
            return;
        }

        const dorm = await dormResp.json();

        const dormitoryId = dorm.id;

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
