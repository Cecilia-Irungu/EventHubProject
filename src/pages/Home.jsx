

function Home() {
    return (
        <div>
            <h1> Upcoming Events</h1>
            {events.map((event) => (
                <div key={event.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
                    <h2>{event.title}</h2>
                    <p>{event.date} | {event.location}</p>
                    <p>{event.description}</p>
                    <button>View Details</button>
                </div>
            ))}
        </div>
    )
}

export default Home;