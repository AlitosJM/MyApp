import React from "react";

const Children = props => {
    // const { classWrapper0, classWrapper1, idWrapper, idFooter } = props;
    const classWrapper0 = props.classWrapper0;
    const classWrapper1 = props.className1;
    const idWrapper = props.idWrapper;
    const idFooter = props.idFooter;

    return (
        <React.Fragment>
            <div className={classWrapper0}>
                <header id={idWrapper}> 
                    <div className={classWrapper1}>
                        <h1>JMAT's Blog ☕</h1>
                    </div>
                </header>
                <section id="summary">
                    <h2>Test</h2>
                </section>
                <main>
                    <p> This is a test</p>
                    <p> This is a test</p>
                </main>


                {props.children}       
            </div>
            <section>
                <footer id={idFooter}>
                    <p> JMAT </p>
                </footer>
            </section>
        </React.Fragment>
    );
};

export default Children;