import './styles.scss';
import Link from 'next/link';

type Props = {
    name: string,
    age: number,
    preference: { [key: string]: number }[]
}
export default function UserCardComponent({name, age, preference}: Props) {
    return (
        <Link href={`/${name}`}>
            <div className="user-card">
                <h2>{name}</h2>
                <p>Age: {age}</p>
                <div className="preferences">
                    <h3>Preferences</h3>
                    {preference.map((pref, index) => (
                        <div key={index}>
                            {Object.entries(pref).map(([key, value]) => (
                                <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value.toFixed(2)}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </Link>
    );
}