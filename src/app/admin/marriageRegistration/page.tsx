import { Card, Input } from "@heroui/react";
import React from "react";

const page = () => {
  return (
    <Card className="mx-auto p-[10rem] bg-white">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-center mb-2">
            લગન-નોંધણી યાદી
          </h1>
          <p className="text-sm text-center">
            (ગુજરાત લગન-નોંધણી અધિનિયમ ૨૦૦૬-ની કલમ-૫)
          </p>
        </div>
        <div className="border-2 border-black w-32 h-24 flex flex-col items-center justify-center text-xs">
          <p>રૂ. ૨૦૦/- નો</p>
          <p>એડમિસન સ્ટેમ્પ</p>
          <p>અહીં લગાવો.</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-4">૧.</span>
            <span className="flex-1">લગનની તારીખ :-</span>
            <Input className="w-64" type="text" variant="underlined" />
          </div>

          <div className="flex items-center">
            <span className="w-4">૨.</span>
            <span className="flex-1">
              લગનનું સ્થળ :- (સ્થળ યોગ્ય ચકાય તે માટે પૂરતી વિગતો આપવી)
            </span>
            <Input className="w-40" type="text" variant="underlined" />
          </div>
        </div>

        {/* Section 3 - Groom Details */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-4">૩.</span>
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <span className="w-12">(ક)</span>
                <span className="w-24">વરનું પૂરું નામ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ખ)</span>
                <span className="w-24">તેની ઉંમર :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="ml-12">
                <p className="text-xs mb-2">
                  (જન્મ નોંધણી પ્રમાણપત્ર કે શાળા છોડવાના પ્રમાણપત્રની ખરી નકલ
                  જોડવી)
                </p>
              </div>

              <div className="flex items-center">
                <span className="w-12">(ગ)</span>
                <span className="w-16">ધર્મ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઘ)</span>
                <span className="w-32">રહેઠાણનું સામાન્ય સ્થળ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઙ)</span>
                <span className="w-16">સરનામું :-</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="ml-12">
                <div className="flex items-center mb-2">
                  <span>(છ)</span>
                  <span className="ml-4">
                    લગન સમયે વરનો દરજ્જો. (જે લાગુ પડતું હોય ત્યાં √ ની નિશાની
                    કરવી)
                  </span>
                </div>

                <div className="flex items-center space-x-8 ml-8">
                  <div className="flex items-center">
                    <span>અપરિણીત</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                  <div className="flex items-center">
                    <span>વિધુર</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                  <div className="flex items-center">
                    <span>છુટાછેડા થયેલ</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                  <div className="flex items-center">
                    <span>પરિણીત અને તેમ હોય તો કેટલી</span>
                  </div>
                </div>

                <div className="flex items-center mt-2 ml-8">
                  <span>પત્નીઓ હયાત છે ?</span>
                  <div className="w-4 h-4 border border-black ml-2"></div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="w-12">(જ)</span>
                <span className="w-32">તારીખ સાથે વરની સહી :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 - Bride Details */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-4">૪.</span>
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <span className="w-12">(ક)</span>
                <span className="w-24">કન્યાનું પૂરું નામ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ખ)</span>
                <span className="w-24">તેણીની ઉંમર :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="ml-12">
                <p className="text-xs mb-2">
                  (જન્મ નોંધણી પ્રમાણપત્ર કે શાળા છોડવાના પ્રમાણપત્રની ખરી નકલ
                  જોડવી)
                </p>
              </div>

              <div className="flex items-center">
                <span className="w-12">(ગ)</span>
                <span className="w-16">ધર્મ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઘ)</span>
                <span className="w-32">રહેઠાણનું સામાન્ય સ્થળ:</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઇ)</span>
                <span className="w-16">સરનામું :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="ml-12">
                <div className="flex items-center mb-2">
                  <span>(છ)</span>
                  <span className="ml-4">
                    લગન સમયે કન્યાનો દરજ્જો : (જે લાગુ પડતું હોય ત્યાં √ ની
                    નિશાની કરવી)
                  </span>
                </div>

                <div className="flex items-center space-x-8 ml-8">
                  <div className="flex items-center">
                    <span>અપરિણીત</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                  <div className="flex items-center">
                    <span>વિધવા</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                  <div className="flex items-center">
                    <span>છુટાછેડા થયેલ</span>
                    <div className="w-4 h-4 border border-black ml-2"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="w-12">(જ)</span>
                <span className="w-32">તારીખ સાથે કન્યાની સહી :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-4">૫.</span>
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <span className="w-12">(ક)</span>
                <span className="w-32">
                  વરના પિતા અથવા માતા અથવા વાલીનું પૂરું નામ :
                </span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ખ)</span>
                <span className="w-16">ઉંમર :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ગ)</span>
                <span className="w-32">રહેઠાણનું સામાન્ય સ્થળ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઘ)</span>
                <span className="w-16">સરનામું :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-4">૬.</span>
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <span className="w-12">(ક)</span>
                <span className="w-32">
                  કન્યાના પિતા અથવા માતા અથવા વાલીનું પૂરું નામ :
                </span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ખ)</span>
                <span className="w-16">ઉંમર :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ગ)</span>
                <span className="w-32">રહેઠાણનું સામાન્ય સ્થળ :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઘ)</span>
                <span className="w-32">સરનામું :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>

              <div className="flex items-center">
                <span className="w-12">(ઙ)</span>
                <span className="w-32">તારીખ સાથે વિધિ કરાવનારની સહી :</span>
                <Input className="flex-1" type="text" variant="underlined" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 8 */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-4">૮.</span>
            <div className="flex-1 space-y-2">
              <div className="flex">
                <span className="w-8">(૧)</span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <span className="w-12">(ક)</span>
                    <span className="w-32">પ્રથમ સાક્ષીનું પૂરું નામ :</span>
                    <Input
                      className="flex-1"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-12">(ખ)</span>
                    <span className="w-16">ઉંમર :</span>
                    <Input
                      className="flex-1"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-12">(ગ)</span>
                    <span className="w-16">સરનામું :</span>
                    <Input
                      className="flex-1"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-12">(ઘ)</span>
                    <span className="w-32">તારીખ સાથે સહી :</span>
                    <Input
                      className="flex-1"
                      type="text"
                      variant="underlined"
                    />
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="w-8">(૨)</span>
                <div className="flex-1 space-y-2">
                  <div className="flex">
                    <span className="w-12">(ક)</span>
                    <span className="w-32">બીજા સાક્ષીનું પૂરું નામ :</span>
                    <Input
                      className="w-[60%]"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex">
                    <span className="w-12">(ખ)</span>
                    <span className="w-16">ઉંમર :</span>
                    <Input
                      className="w-[60%]"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex">
                    <span className="w-12">(ગ)</span>
                    <span className="w-16">સરનામું :</span>
                    <Input
                      className="w-[60%]"
                      type="text"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex">
                    <span className="w-12">(ઘ)</span>
                    <span className="w-32">તારીખ સાથે સહી :</span>
                    <Input
                      className="w-[60%]"
                      type="text"
                      variant="underlined"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Declaration Box */}
        <div className="border-2 border-black p-6 mt-8 space-y-4">
          <p>
            લગન નોંધણી યાદી અને રૂ.
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
            ની ફી તા.
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
            ના રોજ મળી છે અને ગુજરાત
          </p>

          <p>
            લગન નોંધણી અધિનિયમ-૨૦૦૬ અન્વયે નિયાવવામાં આવેલ લગન રજિસ્ટરના ભાગ
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
            ના
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
          </p>

          <p>
            પાના પર
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
            ક્રમે તા.
            <Input
              className="inline-block w-40 mx-2"
              type="text"
              variant="underlined"
            />
            ના રોજ દાખલ કરવામાં આવી છે.
          </p>

          <div className="flex justify-between mt-10">
            <div>
              <p>
                તા. :
                <Input
                  className="inline-block w-40 mx-2"
                  type="text"
                  variant="underlined"
                />
              </p>
            </div>
            <div className="text-right">
              <p>
                સહી :
                <Input
                  className="inline-block w-40 mx-2"
                  type="text"
                  variant="underlined"
                />
              </p>
              <p className="mt-2">લગન નોંધણી રજિસ્ટ્રાર</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default page;
