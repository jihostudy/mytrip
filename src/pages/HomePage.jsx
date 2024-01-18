import React from "react";

// Dummy areas
const dummy_images = ["img1", "img2", "img3", "img4"];

const HomePage = () => {
  const imgContanier = dummy_images.map((img) => (
    <li key={img} className="m-2">
      {img}
    </li>
  ));
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center">
      <form className="mb-52">
        <input
          type="text"
          placeholder="여행지를 입력해주세요"
          id="region-list"
        />
        <datalist id="region-list">
          <option value="제주도" />
          <option value="부산" />
          <option value="경주" />
          <option value="울산" />
          <option value="서울" />
        </datalist>
      </form>
      <div>여행자들의 픽</div>
      <div>
        <ul className="flex justify-evenly">{imgContanier}</ul>
      </div>
    </main>
  );
};

export default HomePage;
