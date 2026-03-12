# Page snapshot

```yaml
- generic [ref=e4]:
  - img [ref=e5]
  - generic [ref=e7]:
    - link [ref=e9] [cursor=pointer]:
      - /url: https://transferty.com
      - img [ref=e10]
    - generic [ref=e11]:
      - heading "Sign in to your account" [level=2] [ref=e12]
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]: Email
          - textbox [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]: Password
          - textbox [ref=e19]
          - img [ref=e20] [cursor=pointer]
        - link "Forgot your password?" [ref=e24] [cursor=pointer]:
          - /url: /recover_pass
        - button "Sign in" [ref=e25] [cursor=pointer]
      - generic [ref=e26]:
        - text: Don't have an account yet?
        - link "Sign up" [ref=e27] [cursor=pointer]:
          - /url: /signup
```