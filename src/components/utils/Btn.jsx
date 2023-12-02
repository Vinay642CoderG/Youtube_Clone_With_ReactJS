import { Link } from "react-router-dom"


const Btn = ({ name = '', btntype, children, className = '', to = '', type, onClick}) => {
    let component
    switch (btntype) {
        case 'button':
            component = (
                <button
                    onClick={onClick}
                    type={type?type:'button'}
                    name={name}
                    className={`${className} flex items-center justify-center rounded-full p-2 hover:bg-white/[0.2]`}
                >
                    {children}
                </button>
            )
            break
        case 'iconWithLink':
            component = (
                <Link
                    type={type?type:'button'}
                    onClick={onClick}
                    to={to}
                    className={`${className} flex items-center justify-center p-1`}
                >
                    {children}
                </Link>
            )
            break
        case 'iconWithoutLink':
            component = (
                <button
                    onClick={onClick}
                    type={type?type:'button'}
                    className={`${className} flex items-center justify-center p-1`}
                >
                    {children}
                </button>
            )
            break
    }
    return <> {component}</>
}

export default Btn
