"use babel";

import "./spec-helper";
import rules from "../lib/rules";

describe("rules", () => {

  describe("packageName", () => {

    it("OK", () => {
      waitsForPromise(() => {
        return atom.workspace
          .open("perl/lib/Pkg/OK.pm")
          .then(textEditor => {
            console.log(textEditor);
            expect(rules.packageName(textEditor)).toBe(null);
          });
      });
    });

    it("NG", (done) => {
      waitsForPromise(() => {
        return atom.workspace
          .open("perl/lib/Pkg/NG.pm")
          .then(textEditor => {
            expect(rules.packageName(textEditor).length).toBe(1);
          });
      });
    });

  });

});
