# Vercel 배포와 제출

## 배포 순서
1. Supabase SQL Editor에서 `supabase/schema.sql`을 실행한다.
2. Vercel에서 GitHub의 `seungwon-77/prd-maker` 레포를 Import한다. Framework Preset은 Next.js, Root Directory는 기본값을 사용한다.
3. Environment Variables에 아래 네 변수를 등록한다. 키는 GitHub나 채팅에 붙여넣지 않는다.
   - `OPENAI_API_KEY`: OpenAI API Keys에서 생성한 키
   - `OPENAI_MODEL`: `gpt-6-luna` (계정에서 사용 가능한 모델로 설정)
   - `SUPABASE_URL`: `https://akpwszkgviiyqlfsitea.supabase.co`
   - `SUPABASE_SECRET_KEY`: Supabase Settings → API Keys → Secret key (레거시 프로젝트는 service_role)
4. Deploy를 누른다. 이미 배포한 뒤 환경변수를 바꿨다면 Redeploy한다.
5. 배포 URL에서 아이디어를 생성한다. 결과와 단계별 프롬프트를 확인한다.
6. 내 PRD 목록에서 새 항목을 열고 새로고침한다. 내용이 남아 있는지 확인한다.
7. 마크다운 복사와 `PRD.md` 다운로드를 확인한다.

## 제출 문구
GitHub: https://github.com/seungwon-77/prd-maker

배포: 배포 완료 후 실제 URL 입력

추가 기능: 팝업스토어 추적 서비스의 1인 개발에 맞춘 AI PRD와 단계별 바이브 코딩 프롬프트를 생성합니다. PRD 자동 저장·목록·상세 조회와 마크다운 복사, PRD.md 다운로드를 구현했습니다.

노션 과제 페이지와 Session 8 회고 제출 칸에 같은 링크를 입력한다.

## 실행 흐름
1. `app/page.tsx`가 입력을 `/api/specs`로 보낸다.
2. 서버가 `lib/openai.ts`로 PRD를 생성하고 `lib/supabase.ts`로 저장한다.
3. `components/SpecView.tsx`가 결과를 표시하고 `lib/markdown.ts`로 복사·다운로드한다.

로그인 없이 같은 프로젝트의 저장된 PRD를 조회하는 세션 과제 구조다. 민감한 내용은 입력하지 않는다.
