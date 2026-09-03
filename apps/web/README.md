## folder structure 
```
src/

app/
│
├── login/
├── dashboard/
├── interview/
├── report/
└── resume/

features/
│
├── auth/
├── dashboard/
├── interview/
├── report/
└── resume/

shared/
│
├── api/
├── components/
├── hooks/
├── lib/
├── providers/
└── types/

```


#### pages flow
```
app/

login/
  page.tsx

dashboard/
  page.tsx

resume/
  page.tsx

interview/
  [id]/
    page.tsx
```


#### feature flow 
```
features/

auth/

├── api/
├── hooks/
├── types/
└── components/
```