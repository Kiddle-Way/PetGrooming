import ListComponent from "../../components/FAQ/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="flex justify-end mt-1 mr-5">
        홈 ＞ 고객센터 ＞&nbsp;<b>자주 묻는 질문</b>
      </div>
      <div className="flex mx-auto justify-center text-3xl text-center font-extrabold">
        자주 묻는 질문(FAQ)
      </div>
      <ListComponent />
    </div>
  );
};
export default ListPage;