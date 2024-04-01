import ListComponent from "../../components/member/ListComponent2";
import BasicLayout from "../BasicLayout2";

const ListPage = () => {
  return (
    <BasicLayout>
      <div className="m-16 flex-col w-full">
        <ListComponent />
      </div>
    </BasicLayout>
  );
};

export default ListPage;
