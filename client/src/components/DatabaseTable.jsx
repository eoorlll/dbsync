import { useSelector } from 'react-redux';
import '../assets/scss/components/db-table.scss'

const DatabaseTable = () => {
    const { currentItems, updatedItems } = useSelector((state) => state.database);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}.${day}.${year}, ${date.toLocaleTimeString()}`;
    };

    return (
        <>
            <div className="db-table">
                {currentItems && currentItems.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Rows</th>
                                <th>Created Date</th>
                                <th>Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => {
                                const isDuplicate = updatedItems.some(updatedItem => updatedItem.id === item.id);
                                return (
                                    <tr key={item.id} className={ isDuplicate ? 'updated-item' : '' }>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.rows}</td>
                                        <td>{formatDate(item.createdDate)}</td>
                                        <td>{formatDate(item.modifiedDate)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default DatabaseTable