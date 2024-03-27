import axios from "axios";
import { API_SERVER_HOST } from "./productApi";

// 서버 주소

const host = `${API_SERVER_HOST}/api/designer`;

//특정번호의 조회
export const getOne = async (dno) => {
  const res = await axios.get(`${host}/${dno}`);

  return res.data;
};

// //페이지 처리를 위함
// export const getList = async (pageParam) => {
//   const { page, size } = pageParam;
//   const res = await axios.get(`${host}/list`, {
//     params: { page: page, size: size },
//   });

//   return res.data;
// };

export const getList = async ({ page, size }) => {
  try {
    const res = await axios.get(`${host}/list`, {
      params: { page: page, size: size },
    });
    return res.data;
  } catch (error) {
    console.error("데이터를 불러오는 데 실패했습니다:", error);
    throw error; // 에러를 잡아서 상위 컴포넌트에서 처리할 수 있도록 throw 해줍니다.
  }
};

// 서버 호출 결과
export const postAdd = async (designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  // 경로    뒤   '/' 주의
  const res = await axios.post(`${host}/`, designer, header);

  return res.data;
};

//삭제 호출기능
export const deleteOne = async (dno) => {
  const res = await axios.delete(`${host}/${dno}`);
  return res.data;
};

//수정 기능
export const putOne = async (dno, designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${host}/${dno}`, designer, header);
  return res.data;
};

// // 디자이너 상태 업데이트
// export const updateDesignerStatus = async (designer) => {
//   try {
//     await axios.put(
//       `${host}/list/${designer.dno}/state?action=${
//         designer.dstate === 1 ? "fire" : "rehire"
//       }`
//     );
//     console.log("디자이너 상태가 업데이트되었습니다.");
//   } catch (error) {
//     console.error("디자이너 상태 업데이트 오류:", error);
//   }
// };

export const updateDesignerStatus = async (dno, designer) => {
  try {
    await axios.put(
      `${host}/${dno}/state`,
      { action: designer.dstate === 1 ? "fire" : "rehire" },
      { withCredentials: true }
    );
    console.log("디자이너 상태가 업데이트되었습니다.");
  } catch (error) {
    console.error("디자이너 상태 업데이트 오류:", error);
  }
};

//검색
export const search = async (keyword, pageParam) => {
  try {
    const { page, size } = pageParam;
    const url = `${host}/list/searchTerm/${keyword}`;
    const res = await axios.get(url, {
      params: { keyword: keyword, page: page, size: size },
    });
    return res.data; // PageResponseDTO<DTO> 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리
  }
};

//성별
export const searchGender = async (searchGender, pageParam) => {
  try {
    const { page, size } = pageParam || {};
    const url = `${host}/list/searchGender/${searchGender}`;

    const res = await axios.get(url, {
      params: { searchGender: searchGender, page: page, size: size },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//근무상태
export const searchState = async (searchState, pageParam) => {
  try {
    const { page, size } = pageParam || {};
    const url = `${host}/list/searchState/${searchState}`;

    const res = await axios.get(url, {
      params: { searchState: searchState, page: page, size: size },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// // 검색
// export const search = async (gender, state, keyword, pageParam) => {
//   try {
//     const { page = 1, size = 10 } = pageParam || {};
//     const res = await axios.get(`${host}/list/search`, {
//       params: {
//         gender: gender,
//         employmentStatus: employmentStatus,
//         keyword: keyword,
//         page: page,
//         size: size,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error searching:", error);
//     throw error;
//   }
// };

// // 셀렉트박스 검색
// export const getSearch = async (stateType, gender, searchTerm, pageParam) => {
//   try {
//     const { page = 1, size = 10 } = pageParam || {};

//     // 근무 형태 값 매핑
//     const stateTypeValue = stateType === "근무" ? "0" : "1";

//     // 성별 값 매핑
//     const genderValue = gender === "여자" ? "1" : "0";

//     let url;

//     // 근무 형태와 성별 중 하나만 선택한 경우
//     if (stateType && !gender) {
//       url = `${host}/list/search/${stateTypeValue}/${searchTerm}`;
//     } else if (!stateType && gender) {
//       url = `${host}/list/search/${genderValue}/${searchTerm}`;
//     } else if (stateType && gender) {
//       // 근무 형태와 성별 둘 다 선택한 경우
//       url = `${host}/list/search/${stateTypeValue}/${genderValue}/${searchTerm}`;
//     } else {
//       // 근무 형태와 성별 둘 다 선택하지 않은 경우
//       url = `${host}/list/search/${searchTerm}`;
//     }

//     const res = await axios.get(url, {
//       params: {
//         keyword: searchTerm,
//         page: page,
//         size: size,
//       },
//     });
//     console.log(url);

//     return res.data;
//   } catch (error) {
//     console.error("Error searching:", error);
//     throw error;
//   }
// };
// export const getSearch = async (workType, gender, searchTerm, pageParam) => {
//   try {
//     // 근무 형태 값 매핑
//     const workTypeValue = workType === "근무" ? "0" : "1";

//     // 성별 값 매핑
//     const genderValue = gender === "여자" ? "1" : "0";

//     const { page, size } = pageParam;

//     // 근무 형태와 성별 중 하나만 선택한 경우
//     if (workType && !gender) {
//       const url = `${host}/list/search/work/${workTypeValue}/${searchTerm}`;
//       const res = await axios.get(url, {
//         params: { page: page, size: size },
//       });
//       return res.data;
//     } else if (!workType && gender) {
//       const url = `${host}/list/search/gender/${genderValue}/${searchTerm}`;
//       const res = await axios.get(url, {
//         params: { page: page, size: size },
//       });
//       return res.data;
//     } else if (workType && gender) {
//       // 근무 형태와 성별 둘 다 선택한 경우
//       const url = `${host}/list/search/${workTypeValue}/${genderValue}/${searchTerm}`;
//       const res = await axios.get(url, {
//         params: { page: page, size: size },
//       });
//       return res.data;
//     }

//     // 근무 형태와 성별 둘 다 선택하지 않은 경우
//     const url = `${host}/list/search/${searchTerm}`;
//     const res = await axios.get(url, {
//       params: { page: page, size: size },
//     });
//     return res.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// 복직 API 호출 함수
export const rehireDesigner = async (dno) => {
  try {
    const response = await axios.put(`${host}/modify/${dno}/rehire`); // 복직 API 엔드포인트에 따라 경로가 다를 수 있습니다.
    return response.data;
  } catch (error) {
    console.error("Error rehiring designer:", error);
    throw error; // 예외를 상위 컴포넌트로 전파하거나 처리할 수 있습니다.
  }
};

// 퇴사 API 호출 함수
export const fireDesigner = async (dno) => {
  try {
    const response = await axios.put(`${host}/modify/${dno}/fire`); // 퇴사 API 엔드포인트에 따라 경로가 다를 수 있습니다.
    return response.data;
  } catch (error) {
    console.error("Error fire designer:", error);
    throw error; // 예외를 상위 컴포넌트로 전파하거나 처리할 수 있습니다.
  }
};
