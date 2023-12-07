import './styles.scss';

type Props = {
    name: string;
    description: string;
    venue: string;
    price: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
}
export default function EventCardComponent({
                                               name,
                                               description,
                                               venue,
                                               price,
                                               location,
                                               date,
                                               startTime,
                                               endTime
                                           }: Props) {
    return (
        <div className="event-card">
            <div className="header">
                <h3>🎉 {name}</h3>
                <p>📅 {date} | ⏰ {startTime} - {endTime}</p>
            </div>
            <p className="description">{description}</p>
            <p className="venue">📍 {venue}, {location}</p>
        </div>
    );
}