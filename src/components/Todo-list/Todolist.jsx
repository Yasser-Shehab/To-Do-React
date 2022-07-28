import ListItem from "../ListItem/ListItem";
import "./Todolist.scss";

function Todolist({ data, ...props }) {
  return (
    <div>
      {data.map((item) => {
        const { id } = item;
        return <ListItem key={id} {...item} {...props} />;
      })}
    </div>
  );
}

export default Todolist;
