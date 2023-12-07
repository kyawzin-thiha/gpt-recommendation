'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import EventCardComponent from '@/components/EventCard';

const getRecommendedEvents = async (user: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-recommendation/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'force-cache'
    });
    console.log(response.status);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

export default function Page() {
    const params = useParams();
    const user = params.user as string;

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
            const events = await getRecommendedEvents(user);
            setEvents(events);
            setLoading(false);
        };
        getEvents();

    }, [user]);

    return (
        <>
            <div className="title">
                <h1>
                    Personalized Events
                </h1>
                <hr/>
            </div>
            <div className="grid">
                {
                    loading ? <div className="loader-container">
                        <div className="loader"></div>
                    </div> : events.map((event: any, index: any) => (
                        <EventCardComponent name={event.name} description={event.description} venue={event.venue}
                                            price={event.price} location={event.location}
                                            date={event.date} startTime={event.startTime} endTime={event.endTime}
                                            key={index}/>
                    ))
                }
            </div>
        </>
    );
}