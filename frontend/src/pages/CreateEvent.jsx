function CreateEvent() {
    return (
        <div>
            <h2>Create Event</h2>
            <form>
                <input placeholder="Title"/>
                <textarea placeholder="Description"></textarea>
                <input type="date" />
                <input type="time" />
                <input type="number" placeholder="Price"/>
                <input placeholder="Location"/>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEvent;