import ListComponent from "../../components/notice/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-2xl font-extrabold">공지사항 관리</div>
      <ListComponent />
    </div>
  );
};

export default ListPage;
