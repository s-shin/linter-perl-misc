"use babel";

import pkg from "../package.json";
import {install} from "atom-package-deps";
import rules from "./rules";

export default {

  config: {
    packageName: {
      title: "Rule: Package Name",
      type: "boolean",
      default: true
    }
  },

  activate(state) {
    install("linter-perl-misc");
  },

  deactivate() {},
  serialize() {},

  provideLinter() {
    return {
      name: "perl-misc",
      grammarScopes: ["source.perl"],
      scope: "file",
      lintOnFly: true,
      lint: (textEditor) => {
        return new Promise((resolve, reject) => {
          Promise
            .all(
              Object
                .keys(rules)
                .filter(name => atom.config.get(`${pkg.name}.${name}`))
                .map(name => rules[name](textEditor))
            )
            .then(results => {
              const availableResults = results
                .filter(result => result)
                .reduce((p, c) => p.concat(c), []); // flatten
              resolve(availableResults);
            }, reject);
        });
      }
    };
  },

};
