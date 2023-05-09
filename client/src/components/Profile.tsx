import Set from './Set';
interface ProfileProps {
    name: string;
    sets: string[];
}


function App(props : ProfileProps){ 
    return (
        <div className="app">
            <h1>Profile</h1>
            <h2>Name: {props.name}</h2>
            <h2>Sets: </h2>
            {props.sets.map((v: any) => (
                <Set
                    subject={v?.subject}
                    title={v?.title}
                    description={v?.description}
                    cards={v?.cards}
                ></Set>
            ))}

        </div>


    );
}

export default App;