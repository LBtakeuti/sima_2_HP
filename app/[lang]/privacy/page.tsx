import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function PrivacyPage({
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
            {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
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
                  株式会社シーマパール（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第1条（個人情報）</h2>
                <p className="mb-6">
                  「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第2条（個人情報の収集方法）</h2>
                <p className="mb-6">
                  当社は，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレス，銀行口座番号，クレジットカード番号，運転免許証番号などの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,当社の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第3条（個人情報を収集・利用する目的）</h2>
                <p className="mb-4">当社が個人情報を収集・利用する目的は，以下のとおりです。</p>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>当社サービスの提供・運営のため</li>
                  <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                  <li>ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
                  <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
                  <li>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>
                  <li>ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</li>
                  <li>有料サービスにおいて，ユーザーに利用料金を請求するため</li>
                  <li>上記の利用目的に付随する目的</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第4条（利用目的の変更）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</li>
                  <li>利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第5条（個人情報の第三者提供）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    当社は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>
                      <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</li>
                      <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                      <li>
                        予め次の事項を告知あるいは公表し，かつ当社が個人情報保護委員会に届出をしたとき
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                          <li>利用目的に第三者への提供を含むこと</li>
                          <li>第三者に提供されるデータの項目</li>
                          <li>第三者への提供の手段または方法</li>
                          <li>本人の求めに応じて個人情報の第三者への提供を停止すること</li>
                          <li>本人の求めを受け付ける方法</li>
                        </ul>
                      </li>
                    </ol>
                  </li>
                  <li>
                    前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                      <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                      <li>個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</li>
                    </ol>
                  </li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第6条（個人情報の開示）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    当社は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</li>
                      <li>当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
                      <li>その他法令に違反することとなる場合</li>
                    </ol>
                  </li>
                  <li>前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第7条（個人情報の訂正および削除）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>ユーザーは，当社の保有する自己の個人情報が誤った情報である場合には，当社が定める手続きにより，当社に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。</li>
                  <li>当社は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</li>
                  <li>当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第8条（個人情報の利用停止等）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</li>
                  <li>前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</li>
                  <li>当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。</li>
                  <li>前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第9条（プライバシーポリシーの変更）</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
                  <li>当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第10条（お問い合わせ窓口）</h2>
                <p className="mb-4">本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。</p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="mb-2"><strong>住所：</strong>〒140-0002 東京都品川区東品川2-2-20 天王洲オーシャンスクエア15階</p>
                  <p className="mb-2"><strong>社名：</strong>株式会社シーマパール</p>
                  <p className="mb-2"><strong>代表取締役：</strong>PATIL SEEMA</p>
                  <p className="mb-2"><strong>担当部署：</strong>お客様相談窓口</p>
                  <p><strong>Eメールアドレス：</strong><a href="mailto:info@seemapaar.com" className="text-brand-600 hover:text-brand-700">info@seemapaar.com</a></p>
                </div>
              </>
            ) : (
              <>
                <p className="mb-8">
                  SEEMAPAR Co., Ltd. (hereinafter referred to as "the Company") establishes this Privacy Policy (hereinafter referred to as "this Policy") regarding the handling of users' personal information in the services provided on this website (hereinafter referred to as "the Service").
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 1 (Personal Information)</h2>
                <p className="mb-6">
                  "Personal information" refers to "personal information" as defined in the Personal Information Protection Act, which is information about a living individual that can identify a specific individual by name, date of birth, address, telephone number, contact information, and other descriptions contained in such information, as well as data relating to appearance, fingerprints, voiceprints, and information that can identify a specific individual from that information alone, such as the insurer number on a health insurance card (personal identification information).
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 2 (Method of Collecting Personal Information)</h2>
                <p className="mb-6">
                  The Company may ask for personal information such as name, date of birth, address, telephone number, email address, bank account number, credit card number, and driver's license number when users register for use. In addition, the Company may collect transaction records and payment information containing users' personal information from partners (including information providers, advertisers, and advertisement delivery destinations; hereinafter referred to as "Partners").
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 3 (Purpose of Collecting and Using Personal Information)</h2>
                <p className="mb-4">The purposes for which the Company collects and uses personal information are as follows:</p>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>To provide and operate the Company's services</li>
                  <li>To respond to inquiries from users (including identity verification)</li>
                  <li>To send emails about new features, updates, campaigns, etc. of the services currently being used by users and other services provided by the Company</li>
                  <li>To contact users as necessary, such as for maintenance and important notices</li>
                  <li>To identify users who violate the Terms of Service or who attempt to use the service for fraudulent or improper purposes, and to refuse their use</li>
                  <li>To allow users to view, change, or delete their registered information and view their usage status</li>
                  <li>To charge users for paid services</li>
                  <li>For purposes incidental to the above purposes of use</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 4 (Change of Purpose of Use)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>The Company may change the purpose of use of personal information only if it is reasonably recognized that the purpose of use is related to that before the change.</li>
                  <li>When the purpose of use is changed, the Company shall notify users or announce on this website the changed purpose by the method prescribed by the Company.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 5 (Provision of Personal Information to Third Parties)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    The Company will not provide personal information to third parties without the prior consent of users, except in the following cases. However, this does not apply to cases permitted by the Personal Information Protection Act and other laws and regulations.
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When it is necessary for the protection of the life, body, or property of an individual and it is difficult to obtain the consent of the person</li>
                      <li>When it is particularly necessary for improving public health or promoting the sound growth of children and it is difficult to obtain the consent of the person</li>
                      <li>When it is necessary to cooperate with a national agency, a local government, or an individual or entity entrusted by them in executing affairs prescribed by laws and regulations, and obtaining the consent of the person is likely to impede the execution of such affairs</li>
                      <li>
                        When the following matters have been notified or announced in advance and the Company has filed with the Personal Information Protection Commission:
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                          <li>The purpose of use includes provision to third parties</li>
                          <li>Items of data to be provided to third parties</li>
                          <li>Means or method of provision to third parties</li>
                          <li>Stopping the provision of personal information to third parties at the request of the person</li>
                          <li>Method of accepting requests from the person</li>
                        </ul>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Notwithstanding the provisions of the preceding paragraph, in the following cases, the recipient of such information shall not be considered a third party:
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When the Company outsources all or part of the handling of personal information within the scope necessary to achieve the purpose of use</li>
                      <li>When personal information is provided in connection with business succession due to merger or other reasons</li>
                      <li>When personal information is to be used jointly with a specific person, and when the person has been notified in advance or placed in a state where the person can easily know the fact, the items of personal information to be used jointly, the scope of joint users, the purpose of use of the users, and the name or title of the person responsible for the management of such personal information</li>
                    </ol>
                  </li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 6 (Disclosure of Personal Information)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li className="mb-4">
                    When requested by the person to disclose personal information, the Company will disclose it to the person without delay. However, if disclosure falls under any of the following, the Company may not disclose all or part of it, and if the Company decides not to disclose it, the Company will notify the person to that effect without delay. A fee of 1,000 yen will be charged for each disclosure of personal information.
                    <ol className="list-decimal list-inside ml-6 mt-2 space-y-2">
                      <li>When there is a risk of harm to the life, body, property, or other rights and interests of the person or a third party</li>
                      <li>When there is a risk of significant hindrance to the proper implementation of the Company's business</li>
                      <li>When it would violate other laws and regulations</li>
                    </ol>
                  </li>
                  <li>Notwithstanding the provisions of the preceding paragraph, in principle, information other than personal information, such as history information and characteristic information, will not be disclosed.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 7 (Correction and Deletion of Personal Information)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>If users' own personal information held by the Company is incorrect, users may request the Company to correct, add, or delete (hereinafter referred to as "correction, etc.") personal information by the procedures prescribed by the Company.</li>
                  <li>When the Company receives the request from the preceding paragraph and determines that it is necessary to respond to the request, the Company shall carry out the correction, etc. of the personal information without delay.</li>
                  <li>When the Company carries out correction, etc. based on the provisions of the preceding paragraph, or when the Company decides not to carry out correction, etc., the Company shall notify users without delay.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 8 (Suspension of Use of Personal Information, etc.)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>When requested by the person to suspend the use or erase (hereinafter referred to as "suspension of use, etc.") on the grounds that personal information is being handled beyond the scope of the purpose of use or that it was obtained by fraudulent means, the Company will conduct the necessary investigation without delay.</li>
                  <li>Based on the results of the investigation in the preceding paragraph, if it is determined that it is necessary to respond to the request, the Company shall suspend the use, etc. of the personal information without delay.</li>
                  <li>When the Company suspends the use, etc. based on the provisions of the preceding paragraph, or when the Company decides not to suspend the use, etc., the Company shall notify users without delay.</li>
                  <li>Notwithstanding the preceding two paragraphs, if it is difficult to suspend the use, etc., such as when a large amount of cost is required for the suspension of use, etc., and alternative measures necessary to protect the rights and interests of users can be taken, this alternative shall be taken.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 9 (Changes to Privacy Policy)</h2>
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  <li>The contents of this Policy may be changed without notice to users, except for matters separately stipulated by laws and regulations and this Policy.</li>
                  <li>Unless otherwise specified by the Company, the changed Privacy Policy shall become effective when posted on this website.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article 10 (Contact)</h2>
                <p className="mb-4">For inquiries regarding this Policy, please contact the following:</p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="mb-2"><strong>Address:</strong> 15F, Tennozu Ocean Square, 2-2-20 Higashi-Shinagawa, Shinagawa-ku, Tokyo 140-0002, Japan</p>
                  <p className="mb-2"><strong>Company Name:</strong> SEEMAPAR Co., Ltd.</p>
                  <p className="mb-2"><strong>Representative Director:</strong> PATIL SEEMA</p>
                  <p className="mb-2"><strong>Department:</strong> Customer Service</p>
                  <p><strong>Email:</strong> <a href="mailto:info@seemapaar.com" className="text-brand-600 hover:text-brand-700">info@seemapaar.com</a></p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
