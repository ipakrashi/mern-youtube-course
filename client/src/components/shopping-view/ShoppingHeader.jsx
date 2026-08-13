import { useSelector } from 'react-redux'

const ShoppingHeader = () => {
    const { user } = useSelector((state) => state.authR)
    return <div>ShoppingHeader - {user.userName}</div>
}

export default ShoppingHeader
