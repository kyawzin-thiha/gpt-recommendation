import UserCardComponent from '@/components/UserCard';

const getAllUsers = async () => {
    const response = await fetch(`${process.env.API_URL}/get-all-users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'force-cache'
    });

    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

export default async function Home() {

    const users = await getAllUsers();
    return (
        <>
            <div className="title">
                <h1>
                    Users
                </h1>
                <hr/>
            </div>
            <div className="grid">

                {
                    users.map((user: any, index: any) => (
                        <UserCardComponent name={user.name} age={user.age} preference={user.preference} key={index}/>
                    ))
                }
            </div>
        </>
    );
}
