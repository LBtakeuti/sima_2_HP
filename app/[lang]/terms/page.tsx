import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
            {lang === 'ja' ? '利用規約' : 'Terms of Service'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
        </div>
      </section>

      {/* コンテンツ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {lang === 'ja' ? (
              <>
                <p className="mb-8">
                  この利用規約（以下，「本規約」といいます。）は，株式会社シーマパール（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第1条（適用）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
                  <li>当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。</li>
                  <li>本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第2条（利用登録）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。</li>
                  <li className="mb-4">
                    当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                      <li>本規約に違反したことがある者からの申請である場合</li>
                      <li>その他，当社が利用登録を相当でないと判断した場合</li>
                    </ol>
                  </li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
                  <li>ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当社は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。</li>
                  <li>ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当社に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第4条（利用料金および支払方法）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>ユーザーは，本サービスの有料部分の対価として，当社が別途定め，本ウェブサイトに表示する利用料金を，当社が指定する方法により支払うものとします。</li>
                  <li>ユーザーが利用料金の支払を遅滞した場合には，ユーザーは年14.6％の割合による遅延損害金を支払うものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第5条（禁止事項）</h2>
                <p className="mb-4">ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
                  <li>当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                  <li>本サービスによって得られた情報を商業的に利用する行為</li>
                  <li>当社のサービスの運営を妨害するおそれのある行為</li>
                  <li>不正アクセスをし，またはこれを試みる行為</li>
                  <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                  <li>不正な目的を持って本サービスを利用する行為</li>
                  <li>本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為</li>
                  <li>他のユーザーに成りすます行為</li>
                  <li>当社が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</li>
                  <li>面識のない異性との出会いを目的とした行為</li>
                  <li>当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
                  <li>その他，当社が不適切と判断する行為</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第6条（本サービスの提供の停止等）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                      <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                      <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                      <li>その他，当社が本サービスの提供が困難と判断した場合</li>
                    </ol>
                  </li>
                  <li>当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第7条（利用制限および登録抹消）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>本規約のいずれかの条項に違反した場合</li>
                      <li>登録事項に虚偽の事実があることが判明した場合</li>
                      <li>料金等の支払債務の不履行があった場合</li>
                      <li>当社からの連絡に対し，一定期間返答がない場合</li>
                      <li>本サービスについて，最終の利用から一定期間利用がない場合</li>
                      <li>その他，当社が本サービスの利用を適当でないと判断した場合</li>
                    </ol>
                  </li>
                  <li>当社は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第8条（退会）</h2>
                <p className="mb-6">ユーザーは，当社の定める退会手続により，本サービスから退会できるものとします。</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第9条（保証の否認および免責事項）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>当社は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
                  <li>当社は，本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。</li>
                  <li>前項ただし書に定める場合であっても，当社は，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。</li>
                  <li>当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第10条（サービス内容の変更等）</h2>
                <p className="mb-6">当社は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第11条（利用規約の変更）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                      <li>本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。</li>
                    </ol>
                  </li>
                  <li>当社はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第12条（個人情報の取扱い）</h2>
                <p className="mb-6">当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第13条（通知または連絡）</h2>
                <p className="mb-6">ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は,ユーザーから,当社が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第14条（権利義務の譲渡の禁止）</h2>
                <p className="mb-6">ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第15条（準拠法・裁判管轄）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>本規約の解釈にあたっては，日本法を準拠法とします。</li>
                  <li>本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</li>
                </ol>

                <p className="text-right mt-12">以上</p>
              </>
            ) : (
              <>
                <p className="mb-8">
                  These Terms of Service (hereinafter referred to as "these Terms") set forth the terms and conditions of use for the services (hereinafter referred to as "the Service") provided by SEEMAPAR Co., Ltd. (hereinafter referred to as "the Company") on this website. All registered users (hereinafter referred to as "Users") shall use the Service in accordance with these Terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 1 (Application)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>These Terms shall apply to all relationships between Users and the Company regarding the use of the Service.</li>
                  <li>In addition to these Terms, the Company may establish various rules (hereinafter referred to as "Individual Provisions") regarding the Service, including rules for use. These Individual Provisions, regardless of their names, shall constitute part of these Terms.</li>
                  <li>In the event that the provisions of these Terms conflict with the provisions of the Individual Provisions in the preceding paragraph, the provisions of the Individual Provisions shall take precedence unless otherwise specified in the Individual Provisions.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 2 (Registration for Use)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>For the Service, registration for use shall be completed when a person wishing to register agrees to these Terms, applies for registration for use by the method prescribed by the Company, and the Company approves the application.</li>
                  <li className="mb-4">
                    The Company may refuse to approve an application for registration for use if it determines that the applicant falls under any of the following reasons, and the Company shall not be obligated to disclose any reasons for such refusal:
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When false information is provided at the time of application for registration for use</li>
                      <li>When the application is from a person who has violated these Terms</li>
                      <li>When the Company determines that registration for use is not appropriate</li>
                    </ol>
                  </li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 3 (Management of User ID and Password)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>Users shall appropriately manage the User ID and password for the Service at their own responsibility.</li>
                  <li>Users may not, under any circumstances, transfer or lend their User ID and password to a third party or share them with a third party. The Company shall deem use by a User ID and password combination that matches the registered information to be use by the User themselves who registered that User ID.</li>
                  <li>The Company shall not be liable for any damage caused by the use of a User ID and password by a third party, except in cases where the Company has intentionally or grossly negligently caused such damage.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 4 (Usage Fees and Payment Methods)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>Users shall pay the usage fees separately determined by the Company and displayed on this website for the paid portion of the Service by the method specified by the Company.</li>
                  <li>If a User delays payment of the usage fees, the User shall pay late payment damages at an annual rate of 14.6%.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 5 (Prohibited Acts)</h2>
                <p className="mb-4">Users shall not engage in any of the following acts when using the Service:</p>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>Acts that violate laws or public order and morals</li>
                  <li>Acts related to criminal activities</li>
                  <li>Acts that infringe on copyrights, trademark rights, and other intellectual property rights included in the content of the Service</li>
                  <li>Acts that destroy or interfere with the functions of servers or networks of the Company, other Users, or other third parties</li>
                  <li>Acts that commercially use information obtained through the Service</li>
                  <li>Acts that may interfere with the operation of the Company's services</li>
                  <li>Acts of unauthorized access or attempts to do so</li>
                  <li>Acts of collecting or accumulating personal information about other Users</li>
                  <li>Acts of using the Service for fraudulent purposes</li>
                  <li>Acts that cause disadvantage, damage, or discomfort to other Users of the Service or other third parties</li>
                  <li>Acts of impersonating other Users</li>
                  <li>Acts of advertising, promotion, solicitation, or business activities on the Service that are not authorized by the Company</li>
                  <li>Acts aimed at meeting strangers of the opposite sex</li>
                  <li>Acts of providing benefits directly or indirectly to antisocial forces in connection with the Company's services</li>
                  <li>Other acts that the Company deems inappropriate</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 6 (Suspension of Service Provision, etc.)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    The Company may suspend or interrupt the provision of all or part of the Service without prior notice to Users if it determines that any of the following reasons exist:
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When performing maintenance, inspection, or updating of the computer system related to the Service</li>
                      <li>When the provision of the Service becomes difficult due to force majeure such as earthquakes, lightning, fires, power outages, or natural disasters</li>
                      <li>When computers or communication lines, etc. are stopped due to an accident</li>
                      <li>When the Company determines that it is difficult to provide the Service</li>
                    </ol>
                  </li>
                  <li>The Company shall not be liable for any disadvantage or damage suffered by Users or third parties due to the suspension or interruption of the provision of the Service.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 7 (Restriction of Use and Deletion of Registration)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    The Company may, without prior notice, restrict the use of all or part of the Service or delete the registration as a User if the User falls under any of the following:
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When any provision of these Terms is violated</li>
                      <li>When it is found that there are false facts in the registered information</li>
                      <li>When there is non-payment of fees or other payment obligations</li>
                      <li>When there is no response to communications from the Company for a certain period</li>
                      <li>When the Service has not been used for a certain period since the last use</li>
                      <li>When the Company determines that the use of the Service is not appropriate</li>
                    </ol>
                  </li>
                  <li>The Company shall not be liable for any damage caused to Users due to actions taken by the Company based on this Article.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 8 (Withdrawal)</h2>
                <p className="mb-6">Users may withdraw from the Service by following the withdrawal procedures prescribed by the Company.</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 9 (Disclaimer and Exemption)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>The Company does not guarantee, either expressly or implicitly, that the Service is free from de facto or legal defects (including defects related to safety, reliability, accuracy, completeness, effectiveness, fitness for a particular purpose, security, errors or bugs, and infringement of rights).</li>
                  <li>The Company shall not be liable for any damage caused to Users arising from the Service, except in cases of intentional or gross negligence by the Company. However, this exemption provision shall not apply if the contract between the Company and Users regarding the Service (including these Terms) constitutes a consumer contract as defined in the Consumer Contract Act.</li>
                  <li>Even in the cases specified in the proviso of the preceding paragraph, the Company shall not be liable for any damage arising from special circumstances (including cases where the Company or Users foresaw or could have foreseen the occurrence of damage) caused to Users due to default or tort caused by the Company's negligence (excluding gross negligence). Furthermore, compensation for damage caused to Users due to default or tort caused by the Company's negligence (excluding gross negligence) shall be limited to the amount of usage fees received from Users in the month in which such damage occurred.</li>
                  <li>The Company shall not be liable for any transactions, communications, or disputes that occur between Users and other Users or third parties in connection with the Service.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 10 (Changes to Service Content, etc.)</h2>
                <p className="mb-6">The Company may change, add, or discontinue the content of the Service with prior notice to Users, and Users shall consent to this.</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 11 (Changes to Terms of Service)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    The Company may change these Terms without the individual consent of Users in the following cases:
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When the change to these Terms conforms to the general interests of Users.</li>
                      <li>When the change to these Terms does not contradict the purpose of the service use contract and is reasonable in light of the necessity of the change, the appropriateness of the content after the change, and other circumstances related to the change.</li>
                    </ol>
                  </li>
                  <li>The Company shall notify Users in advance of the fact that these Terms will be changed, the content of the Terms after the change, and the effective date of the change when changing these Terms pursuant to the preceding paragraph.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 12 (Handling of Personal Information)</h2>
                <p className="mb-6">The Company shall appropriately handle personal information obtained through the use of the Service in accordance with the Company's "Privacy Policy."</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 13 (Notice or Contact)</h2>
                <p className="mb-6">Notices or communications between Users and the Company shall be made by the method prescribed by the Company. Unless the Company receives notice of a change from Users in accordance with the format separately prescribed by the Company, the Company shall deem the currently registered contact information to be valid and shall send notices or communications to such contact information, which shall be deemed to have reached Users at the time of transmission.</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 14 (Prohibition of Transfer of Rights and Obligations)</h2>
                <p className="mb-6">Users may not transfer or assign their position under the use contract or their rights or obligations under these Terms to a third party or provide them as collateral without the prior written consent of the Company.</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 15 (Governing Law and Jurisdiction)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>These Terms shall be governed by and construed in accordance with Japanese law.</li>
                  <li>In the event of any dispute arising out of or in connection with the Service, the court having jurisdiction over the location of the Company's head office shall have exclusive jurisdiction.</li>
                </ol>

                <p className="text-right mt-12">End</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
