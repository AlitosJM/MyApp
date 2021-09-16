const Children = props => {
    const classWrapper0 = props.className0;
    const classWrapper1 = props.className1;
    const idWrapper = props.id;

    return (
        <div className={classWrapper0}>
            <header id={idWrapper}> 
                <div className={classWrapper1}>
                    <h1>JMAT's Blog ☕</h1>
                </div>
            </header>
            {props.children}       
        </div>
    );
};

export default Children;