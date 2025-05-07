import React from "react";

const RecommendationCard = ({ hospital }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm w-full sm:max-w-full mx-10">
      <a href="#">
        <h5 className="mb-2 text-[14px] sm:text-[16px] font-bold tracking-tight text-gray-900 dark:text-white">
          {hospital.name}
        </h5>
      </a>
      <div className="grid grid-cols-2 gap-1 mb-3">
        <InfoItem icon="/assets/ic_profile.png" text={hospital.owner} />
        <InfoItem icon="/assets/ic_profile.png" text={`Rp.${hospital.cost}`} />
        <InfoItem icon="/assets/ic_profile.png" text={hospital.year} />
        <InfoItem
          icon="/assets/ic_profile.png"
          text={`${hospital.speed} Mbps`}
        />
      </div>
      <div className="border-b-2 border-blue-500"></div>
      <div className="pt-4">
        <h5 className="mb-2 text-[10px] sm:text-[12px] tracking-tight text-gray-900 dark:text-white">
          {hospital.description}
        </h5>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <img src={icon} alt="Icon" className="w-4 sm:w-5 h-4 sm:h-5" />
    <p className="text-[10px] sm:text-[12px] text-gray-700 dark:text-gray-400">
      {text}
    </p>
  </div>
);

const Pagess = () => {
  const hospitals = [
    {
      name: "RS Fatimah Serang",
      owner: "Sarah Nuharita",
      cost: "272.568.000",
      year: "2017",
      speed: "50",
      description: "Dengan sistem online yang aman dan terintegrasi...",
    },
    {
      name: "RS Fatimah Serang",
      owner: "Sarah Nuharita",
      cost: "272.568.000",
      year: "2017",
      speed: "50",
      description: "Dengan sistem online yang aman dan terintegrasi...",
    },
  ];

  return (
    <main className="bg-gray-900 text-white p-4 min-h-screen justify-center">
      <div className="flex flex-col max-w-4xl mx-auto h-full">
        <h1 className="text-2xl sm:text-3xl text-center p-10">Rekomendasi</h1>
        <div className="flex flex-row gap-4 justify-between items-center w-full">
          {hospitals.map((hospital, index) => (
            <RecommendationCard key={index} hospital={hospital} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Pagess;
