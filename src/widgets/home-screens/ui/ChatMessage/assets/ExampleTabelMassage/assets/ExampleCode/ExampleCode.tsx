import './ExampleCode.less';

function ExampleCode() {
    return (<div className={"example-code-container"}>
        <p className={'code'}>
            <p className={'dif-params'}>
                <p className={'def'}>def</p>
                <p className={'dif-name'}>delete_element</p>
                <p className={'dif-value'}>(my_list, element):</p>
            </p>
        <p className={'dif-content'}>"""Removes the first occurrence of the element from the list."""</p>
        </p>
        <div className={'example-code-buttons'}>
            <button>value</button>
            <button>value</button>
            <button>value</button>
            <button>value</button>
            <button>calculate</button>
            <button>x2</button>
        </div>
    </div>);
}
export default ExampleCode;