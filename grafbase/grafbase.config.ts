import { g, config, auth, connector } from "@grafbase/sdk";

const mongo = connector.MongoDB({
  name: "grafbasetest",
  apiKey: g.env('MONGODB_API_KEY'),
  appId: g.env('MONGODB_API_ID'),
  database: g.env('MONGODB_DATABASE'),
  dataSource: g.env('MONGODB_DATASOURCE'),
});

g.datasource(mongo)

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 100 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
