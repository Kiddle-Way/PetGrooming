import de01 from "../../../image/mini.jpg";

const DesignerComponents = ({ children }) => {
  return (
    <div className="w-auto">
      <div className="flex justify-end my-9 mr-5">
        홈 ＞ 회사소개 ＞<b>디자이너 소개</b>
      </div>

      <div className="flex flex-col gap-4">
        {/* 이미지와 텍스트 그룹 반복 */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex flex-col items-center">
            <img
              src={de01}
              alt="디자이너 이미지"
              className="w-40 h-60 mx-auto"
            />
            <h4 className="my-10 text-lg text-center">
              {item === 1 && "편안한 미용"}
              {item === 2 && "보호자와 소통"}
              {item === 3 && "상담 가능"}
              {item === 4 && "전문적인 샴푸 및 트리밍"}
              {item === 5 && "안전하고 쾌적한 환경"}
            </h4>
            <p className="text-gray-600 text-center">
              {item === 1 &&
                "강아지들이 스트레스 없이 편하게 즐길 수 있는 공간 : P"}
              {item === 2 &&
                "강아지의 미용 / 목욕 전 후 사진과 동영상을 받아보세요!"}
              {item === 3 &&
                "담당 디자이너가 상주하여 카카오톡 / 고객센터에서 가능!"}
              {item === 4 &&
                "강아지의 피부 및 모질 상태에 맞는 전문적인 샴푸 및 트리밍 제공"}
              {item === 5 && "넓고 쾌적한 공간에서 안전하고 편안하게 이용 가능"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerComponents;
