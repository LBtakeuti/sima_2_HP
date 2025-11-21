import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Email API called')
    const body = await request.json()
    const { name, email, company, phone, message, language, serviceName } = body
    console.log('Request body received:', { name, email, company, phone, language, serviceName })

    // 環境変数のチェック
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }
    console.log('✓ RESEND_API_KEY is configured')

    if (!process.env.CONTACT_NOTIFICATION_EMAIL) {
      console.error('CONTACT_NOTIFICATION_EMAIL is not configured')
      return NextResponse.json(
        { error: 'Notification email is not configured' },
        { status: 500 }
      )
    }
    console.log('✓ CONTACT_NOTIFICATION_EMAIL is configured')

    // 環境変数から複数のメールアドレスを取得
    // カンマ区切りの文字列を配列に変換
    const notificationEmails = process.env.CONTACT_NOTIFICATION_EMAIL
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    if (notificationEmails.length === 0) {
      console.error('No valid notification emails configured')
      return NextResponse.json(
        { error: 'No notification emails configured' },
        { status: 500 }
      )
    }
    console.log(`✓ Notification emails (${notificationEmails.length}):`, notificationEmails.join(', '))

    // 送信元メールアドレスを環境変数から取得（設定がない場合はデフォルト）
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    console.log(`✓ From email: ${fromEmail}`)

    // 言語に応じた件名
    const subjectPrefix = language === 'ja' ? '【お問い合わせ】' : language === 'en' ? '[Contact Inquiry]' : '[संपर्क पूछताछ]'

    console.log('📮 Attempting to send email via Resend...')
    const { data, error } = await resend.emails.send({
      from: fromEmail, // 環境変数から取得した送信元アドレス
      to: notificationEmails, // 複数のメールアドレス
      replyTo: email, // お問い合わせ者のメール（返信用）
      subject: `${subjectPrefix} ${name}様より`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">新しいお問い合わせ</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              お問い合わせ者情報
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${serviceName ? `
              <tr>
                <td colspan="2" style="padding: 15px 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: bold; text-align: center; font-size: 16px; border-radius: 6px;">
                  📋 ${serviceName}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; width: 120px; font-weight: bold; color: #666;">お名前:</td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #666;">メール:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">会社名:</td>
                <td style="padding: 10px 0;">${company || '未入力'}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #666;">電話番号:</td>
                <td style="padding: 10px 0;">${phone || '未入力'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">言語:</td>
                <td style="padding: 10px 0;">${language === 'ja' ? '日本語' : language === 'en' ? 'English' : 'हिन्दी'}</td>
              </tr>
            </table>

            <div style="margin-top: 30px;">
              <h2 style="color: #667eea; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                メッセージ内容
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin-top: 15px;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; font-size: 14px; color: #999;">
                📧 このメールは ${notificationEmails.length} 名に送信されました
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #999;">
                送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
              </p>
            </div>
          </div>

          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="margin: 0; font-size: 12px; color: #999;">
              このメールはSEEMAPAARウェブサイトのお問い合わせフォームから自動送信されました
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Email sending error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to send email notification', details: error.message || 'Unknown error' },
        { status: 500 }
      )
    }

    console.log('✅ Email sent successfully to:', notificationEmails.join(', '))

    return NextResponse.json({
      success: true,
      data,
      recipients: notificationEmails.length,
    })
  } catch (error) {
    console.error('API error:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
