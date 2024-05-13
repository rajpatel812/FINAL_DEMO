import React from 'react'

function Bottom() {
  return (
    <div>
      <section className=" my-12 lg:py-10" id="home_section">
        <div className="mx-auto max-w-7xl px-2 md:px-0">
          <div className="my-4">
            <h1 className="text-3xl font-bold">Our Team Leaders</h1>
            <p className="mt-2 text-gray-500">
              Allow us to introduce you to our team of department leaders, who
              have honed their expertise in their respective fields over the
              course of more than eight years. These individuals possess a
              wealth of knowledge and experience, and are committed to
              delivering the highest quality of work in their areas of
              specialization.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
            <div className="flex flex-col items-center text-start">
              <div
                className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt=""
                  className="z-0 h-full w-full rounded-[10px] object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-xl font-semibold text-white">John Doe</h1>
                  <h6 className="text-base text-white">
                    {" "}
                    Lead Frontend Developer
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-start">
              <div
                className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt=""
                  className="z-0 h-full w-full rounded-[10px] object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-xl font-semibold text-white">
                    Mark Cook
                  </h1>
                  <h6 className="text-base text-white">
                    Lead Backend Developer
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-start">
              <div
                className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt=""
                  className="z-0 h-full w-full rounded-[10px] object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-xl font-semibold text-white">Ketty</h1>
                  <h6 className="text-base text-white">Lead Designer</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bottom
